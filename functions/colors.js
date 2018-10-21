exports.tohs = color => {
  hsl = new Map([
    ["white", [{ hue: 0, saturation: 0 }]],
    ["red", [{ hue: 0, saturation: 100 }]],
    ["blue", [{ hue: 230, saturation: 100 }]],
    ["green", [{ hue: 120, saturation: 100 }]],
  ]);

  return hsl.get(color.toLowerCase());
};
