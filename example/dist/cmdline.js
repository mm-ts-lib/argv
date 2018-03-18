"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argv_1 = require("./argv");
const pkg = require("../package.json");
exports.default = argv_1.default(pkg.name, pkg.version, `  Example using for Test ts argv library
  you can using: "${pkg.name} [cmd] params ..." to test it
  `, {
    cmd: {
        short: null,
        desc: 'config directory ,default is ./config',
        value: 'run',
    },
    port: {
        short: 'p',
        desc: 'service listen port,default:3000',
        value: 3000,
    },
    boo: {
        short: 'b',
        desc: 'service listen port,default:3000',
        value: false,
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kbGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWRsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTBCO0FBRTFCLHVDQUF3QztBQUt4QyxrQkFBZSxjQUFJLENBQ2pCLEdBQUcsQ0FBQyxJQUFJLEVBQ1IsR0FBRyxDQUFDLE9BQU8sRUFDWDtvQkFDa0IsR0FBRyxDQUFDLElBQUk7R0FDekIsRUFDRDtJQUNFLEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLHVDQUF1QztRQUM3QyxLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsS0FBSyxFQUFFLEtBQUs7S0FDYjtDQUNGLENBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcmd2IGZyb20gJy4vYXJndic7XG5cbmltcG9ydCBwa2cgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcblxuLyoqXG4gKiDlr7zlh7rop6PmnpDlkI7nmoTlkb3ku6TooYxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXJndihcbiAgcGtnLm5hbWUsXG4gIHBrZy52ZXJzaW9uLFxuICBgICBFeGFtcGxlIHVzaW5nIGZvciBUZXN0IHRzIGFyZ3YgbGlicmFyeVxuICB5b3UgY2FuIHVzaW5nOiBcIiR7cGtnLm5hbWV9IFtjbWRdIHBhcmFtcyAuLi5cIiB0byB0ZXN0IGl0XG4gIGAsXG4gIHtcbiAgICBjbWQ6IHtcbiAgICAgIHNob3J0OiBudWxsLFxuICAgICAgZGVzYzogJ2NvbmZpZyBkaXJlY3RvcnkgLGRlZmF1bHQgaXMgLi9jb25maWcnLFxuICAgICAgdmFsdWU6ICdydW4nLCAvLyDnvLrnnIHlgLxcbiAgICB9LFxuICAgIHBvcnQ6IHtcbiAgICAgIHNob3J0OiAncCcsXG4gICAgICBkZXNjOiAnc2VydmljZSBsaXN0ZW4gcG9ydCxkZWZhdWx0OjMwMDAnLFxuICAgICAgdmFsdWU6IDMwMDAsIC8vIOe8uuecgeWAvFxuICAgIH0sXG4gICAgYm9vOiB7XG4gICAgICBzaG9ydDogJ2InLFxuICAgICAgZGVzYzogJ3NlcnZpY2UgbGlzdGVuIHBvcnQsZGVmYXVsdDozMDAwJyxcbiAgICAgIHZhbHVlOiBmYWxzZSwgLy8g57y655yB5YC8ICAgICAgXG4gICAgfVxuICB9XG4pO1xuXG4iXX0=