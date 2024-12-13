class Color {
    /*
        red = 0..255
        green = 0..255
        blue = 0..255
        alpha = [0, 1]
    */
    constructor(red, green, blue, alpha = 1) {
        // Инициализируем значения цвета в формате RGBA
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    // Метод для получения цвета в формате RGBA
    toRGBA() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}

class Camera {
    /*
        x, y, z in global coords
        width and height in mathematical coords, defines picture plane, scale too
    */
    constructor(x, y, z, d, scale, width, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = d;
        this.scale = scale;
        this.width = width;
        this.height = height;
    }
}

class Vertex{
    constructor(x, y, z) {
        // Инициализируем значения цвета в формате RGBA
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function define_pixel_data(pixels, x, y, color)
{
    const index = (y * width + x) * 4; // индекс пикселя
    pixels[index] = color.red; // красный канал
    pixels[index + 1] = color.green; // зелёный канал
    pixels[index + 2] = color.blue; // синий канал
    pixels[index + 3] = Math.round(color.alpha * 255); // альфа канал
}



const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const FPS = 30;
const frame_duration = 1000 / FPS;


function update(delta_time)
{

}

function render()
{
    const frame = ctx.createImageData(width, height);
    const pixels = frame.data;

    const camera = new Camera (1, 2, 3, 1)
    const a = new Vertex(2, 2, 3);

    ctx.putImageData(frame, 0, 0);
}

let last_time = performance.now;
let delta_time = 0;

function main_loop()
{
    const current_time = performance.now;
    delta_time = (current_time - last_time) / 1000;
    last_time = current_time;

    update(delta_time);
    render();

    setTimeout(main_loop, frame_duration);
}

const frame = ctx.createImageData(width, height);
const pixels = frame.data;
for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
        define_pixel_data(pixels, x, y, new Color((x*y) / 255, -(x*y) / 255, -(x*y) / 255, 1));
    }
}
ctx.putImageData(frame, 0, 0);