
var gulp = require('gulp'),
    // inlineCss = require('gulp-inline-css'),
    imagemin = require('gulp-imagemin');

// gulp.task('default', function () {
//     return gulp.src('./public/edm/index.html')
//         .pipe(inlineCss({
//             applyStyleTags: true,
//             applyLinkTags: true,
//             removeStyleTags: true,
//             removeLinkTags: true
//         }))
//         .pipe(gulp.dest('public/edm/build'));
        
// });

gulp.task('imagemin', () =>
    gulp.src('./public/vote/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('public/vote/images_dist'))
);
