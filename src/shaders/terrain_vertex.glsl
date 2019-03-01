#pragma glslify: map = require(glsl-map)
#pragma glslify: snoise = require(glsl-noise/simplex/2d)
#define PI 3.1415926535897932384626433832795

uniform float u_amp;
uniform float u_center;
uniform float u_width;
uniform float u_time;

void main()	{
    // Remap our x value from 0/1 to -1/1 so we get a symetric shape
    float x = map(uv.x, 0.0, 1.0, -1.0, 1.0);

    float noiseValue = snoise(vec2(cos(u_time), sin(u_time)));

    float valley_center = snoise(vec2(uv.y + u_time, 0.0));
    valley_center = map(valley_center, 0.0, 1.0, -0.2, 0.2);
//    float valley_center = u_center;

//    float valley_width_noise_offset = 100.0;
//    float valley_width = snoise(vec2(uv.y + u_time, valley_width_noise_offset));
//    valley_width = map(valley_width, 0.0, 1.0, 20.0, 40.0);
    float valley_width = u_width;

    // float displacement = pow( abs( cos( x + valley_center ) ), valley_width ) * u_amp;
    float displacement = pow( cos( x + valley_center ), valley_width ) * u_amp;

    vec3 newPosition = vec3(position.x, position.y, position.z + displacement);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
