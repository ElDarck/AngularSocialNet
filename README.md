# Angular пример социальной сети
================================

Проект был сгенерирован при помощи [Angular CLI](https://github.com/angular/angular-cli) версии 12.2.10.
Автор делал проект для обучения и демонстрации.

## Описание проекта
-------------------

Это постой пример социальной сети. В нем присутствуют страница логина и регистрации, страница пользователя, где он может добавить фото
или отредактировать свои данные (а также просмотреть их), страница, где показаны все зарегестрированные пользователи и краткая информация
по ним (кнопки редактирования пользователя и уго подробная информация). Для пользователя со статусом администратора есть еще одна страница.
Администратор может удалять и создавать пользователей, а также редактировать их данные. Сайт сделан на двух языках - английском и французском.

Макет состоит из 3-х компонентов - header, content и footer.
Header и footer не изменяются. В content продгружаются все остальные компоненты.

Помимо основного модуля присутствуют модуль - регистрации/логина и пользовательский модуль.

В качестве сервера используется json-server, на который отправляются все запросы.
В проекте используется глобальный сервис для отправки запросов.
Логин и регистрация используют POST запрос. Обновление пользоватеьских данных - PATCH запрос, удаление пользователя - DELETE. Для полкчения
списка пользоватедей и отдельных пользователей - GET.

Есть маршрутиризация и guards.Без логина не зайти на сайт, баз статуса администратора не зайти на админмкую страницу.

Регистрация, логин, изменение данных и добавление новых пользователей происходит при помощи reactive-forms.
Есть валидаторы форм. Есть самодельные валидаторы(проверка возраста - дата не должна быть больше сегодняшнего дня, а также дата поступления в 
университет должна быть меньше текущей даты). Присутствует динамическое отображение ошибок валидации.

Есть pipe-ы. Есть самодельный pipe (сокращает имя: Валентин(валентин) -> В. , применим к любой строке).

Есть поиск (на админ. странице и странице всех пользователей).

Присутствует спиннер - при отправке запросов, переходе на страницы.

Возможность добавлять фото. Картинка сохраняется в формате base64 на сервере.

Используется бибилиотека ngx-toastr - при выполнении различных действий всплывают сообщения о совершении действий или о их ошибках.

В проекте также используются bootstrap, angular material и SASS препроцессор.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
