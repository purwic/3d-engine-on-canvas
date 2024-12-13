class Color {
    constructor(red, green, blue, alpha = 1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    toRGBA() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
}

class Camera {
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

class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function define_pixel_data(pixels, x, y, color) {
    const index = (y * width + x) * 4;
    pixels[index] = color.red;
    pixels[index + 1] = color.green;
    pixels[index + 2] = color.blue;
    pixels[index + 3] = Math.round(color.alpha * 255);
}

const fps = document.getElementById('fps');
const canvas = document.getElementById('main_canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

var time = 0.0;

function update(delta_time) {
    time = time + delta_time;
}

function render() {
    const frame = ctx.createImageData(width, height);
    const pixels = frame.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            define_pixel_data(pixels, x, y, new Color((x + y) * time % 255, 0 % 255, 0 * time % 255, 1));
        }
    }

    ctx.putImageData(frame, 0, 0);
}

let last_time = performance.now();
let delta_time = 0;

function main_loop() {
    const current_time = performance.now();
    delta_time = (current_time - last_time) / 1000;
    last_time = current_time;

    update(delta_time);
    render();

    fps.textContent = "FPS: " + Math.round(1/delta_time);

    requestAnimationFrame(main_loop);
}

main_loop();
