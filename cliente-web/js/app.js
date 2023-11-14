'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('login', 'login.html', true),
            new Route('admin', 'admin.html'),
            new Route('gestion-ascensores', 'gestion-ascensores.html'),
            new Route('gestion-visitantes', 'gestion-visitantes.html'),
            new Route('gestion-permisos', 'gestion-permisos.html'),
        ]);
    }   
    init();
}());