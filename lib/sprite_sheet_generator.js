var fs = require("fs");
module.exports = {

  create_sheet: function(name, size, frames) {
    var base_image = './public/images/source/' + name + '.png'
    var temp_mouseover_image = './public/images/generated/temp/' + name + '.png'
    var new_sheet_location = './public/images/generated/' + name + size + '.png'
    gm(base_image)
      .colorize(20, 20, 80)
      .write(temp_mouseover_image, function (err) {
        if (err) console.log(err);
        gm(base_image)
        .append(temp_mouseover_image)
        .scale(size*frames, size)
        .write(new_sheet_location, function (err) {
          if (err) console.log(err);
        });
      });
  },
}
