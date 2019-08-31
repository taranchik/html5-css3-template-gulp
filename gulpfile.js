//Подключаем локальные пакеты
var gulp = require("gulp");
var sass = require("gulp-sass");

//Определение задачи по умолчанию в GULP
gulp.task("default", function() {
    console.log("default Gulp function is started");
})

//Задача для компиляции, взято из примера
//Определение новой задачи в GULP для SCSS и SASS
gulp.task("sass", function() {
    //**- ищем везде, включая вложенные папки
    gulp.src(["./css/**/*.scss", "./css/**/*.sass"])
        //Компиляция scss или sass в css формат
        .pipe(sass())
        //Вывод ошибки, без окончания компиляции
        .pipe(sass().on("error", sass.logError))
        //Путь компиляции файлов
        .pipe(gulp.dest("./css"))
})

//Задача для компиляции и отслеживания, написанная мною
//Задача отслеживания изменений в наших файлах
gulp.task("sass:watch", function(done) {
    //**- ищем везде, включая вложенные папки
    gulp.src(["./css/**/*.scss", "./css/**/*.sass"])

        //Компиляция scss или sass в css формат
        .pipe(sass())

        //Вывод ошибки, без прерывания отслеживания, по сути мы проглотили ошибку,
        //но вывели текст в котором написанно почему она возникла
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })

        //Путь компиляции файлов(в папку css)
        .pipe(gulp.dest("./css"))

        // gulp автоматически передает функцию обратного вызова нашей задаче
        //в качестве первого аргумента. Просто вызываем эту функцию, когда все операции закончены.
        done();
})

//Отслеживание изменений
gulp.task("sassWatch", function() {
    //Находим папку и отмечаем, за каким файлом необходимо наблюдать, если он найден - выполняем задание "scss-watch"
    gulp.watch(["./css/**/*.scss", "./css/**/*.sass"], gulp.series("sass:watch"));
})
