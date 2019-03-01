#pragma glslify: map = require(glsl-map)
#define PI 3.1415926535897932384626433832795

uniform float u_displacement_amp;
uniform float u_curve_shape;

void main()	{
    float amplitude = u_displacement_amp;

    // Remap our x value from 0/1 to -1/1 so we get a symetric shape
    float x = map(uv.x, 0.0, 1.0, -1.0, 1.0);

    // For additionnal GSLS shaping functions, see https://www.flickr.com/photos/kynd/9546075099/
    float displacement = pow(
        cos(PI * x / 2.0),
        u_curve_shape
    ) * amplitude;
    float reverseDisplacement = 1.0 - displacement;

    vec3 newPosition = vec3(position.x, position.y, position.z + reverseDisplacement);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
