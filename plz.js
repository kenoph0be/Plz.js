
/*
 * Color utilities.
 */
Plz = {
    /*
     * Convert number to 2-character hex string.
     */
    byteToHex: function (num) {
        num = Math.round(num);
        if (num > 0xFF) {
            num = 0xFF;
        } else if (num < 0) {
            num = 0;
        }
        var s = num.toString(16).toUpperCase();
        if (s.length == 1) {
            s = "0" + s;
        }
        return s;
    },

    /*
     * Continuous green->yellow->red colorscheme
     * HSV's value uses a fixed constant + a factor given by a simple quadratic function
     * created by trial-and-error.
     */
    gyr: function (index, length) {
        var newHue = 0.4 - 0.5 * (index / (length - 1));
        var newVal = 0.5 + 0.5 * (1 - Math.pow(1.6 * index / (length - 1) - 1, 2));
        
        if (newVal < 0) {
            newVal = 0;
        } else if (newVal > 1) {
            newVal = 1;
        }

        if (newHue < 0) {
            newHue = 0;
        } else if (newHue > 1) {
            newHue = 1;
        }

        return this.hsvToRgb(newHue, 0.8, newVal);
    },

    /*
     * 5-colors green -> yellow -> red from the Internet
     */
    gyr5: [
        "#3DBB7E",
        "#A3CD39",
        "#FBAC1D",
        "#F96C1E",
        "#EE4036"
    ],

    /*
     * Generate shades of gyr.
     */
    gyrs: function (n) {
        var colors = [];
        for (var i = 0; i < n; i++) {
            colors.push(this.gyr(i, n));
        }
        return colors;
    },

    /*
     * Convert HSV to RGB. HSV coordinates in [0, 1].
     */
    hsvToRgb: function (h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (h && s === undefined && v === undefined) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return "#" + this.byteToHex(Math.floor(r * 255))
                   + this.byteToHex(Math.floor(g * 255))
                   + this.byteToHex(Math.floor(b * 255));
    }
}

