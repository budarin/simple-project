// 'use strict';

// https://habr.com/ru/company/yandex/blog/431432/
// https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines

module.exports = {
    // Добавим описание на русском языке ко всем типам
    types: [
        {
            value: 'build',
            name: 'build:     Сборка проекта или изменения внешних зависимостей',
        },

        { value: 'ci', name: 'ci:        Настройка CI и работа со скриптами' },
        { value: 'chore', name: 'chore:      Рутинная работа' },
        { value: 'docs', name: 'docs:      Обновление документации' },
        { value: 'deps', name: 'deps:      Обновление зависимостей' },
        { value: 'feat', name: 'feat:      Добавление нового функционала' },
        { value: 'fix', name: 'fix:       Исправление ошибок' },
        {
            value: 'perf',
            name: 'perf:      Изменения направленные на улучшение производительности',
        },
        {
            value: 'refactor',
            name: 'refactor:  Правки кода без исправления ошибок или добавления новых функций',
        },
        { value: 'revert', name: 'revert:    Откат на предыдущие коммиты' },
        {
            value: 'style',
            name: 'style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)',
        },
        { value: 'test', name: 'test:      Добавление тестов' },
    ],

    // Область. Она характеризует фрагмент кода, которую затронули изменения

    // animations
    // common
    // compiler
    // compiler-cli
    // core
    // elements
    // forms
    // http
    // language-service
    // platform-browser
    // platform-browser-dynamic
    // platform-server
    // platform-webworker
    // platform-webworker-dynamic
    // router
    // service-worker
    // upgrade

    scopes: [{ name: 'components' }, { name: 'tutorial' }, { name: 'catalog' }, { name: 'product' }],

    // Возможность задать спец ОБЛАСТЬ для определенного типа коммита (пример для 'fix')
    /*
    scopeOverrides: {
      fix: [
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */

    // Поменяем дефолтные вопросы
    messages: {
        type: 'Какие изменения вы вносите? *',
        scope: '\nВыберите scope, который вы изменили:',
        // Спросим если allowCustomScopes в true
        customScope: 'Укажите свой scope:',
        subject: 'Напишите КОРОТКОЕ описание *:\n',
        body: 'Напишите ПОДРОБНОЕ описание. Используйте "|" для новой строки:\n',
        breaking: 'Список BREAKING CHANGES *:\n',
        footer: 'Мета данные (номеров задач, ссылок и остального)\n',
        confirmCommit: 'Вас устраивает получившийся коммит?',
    },

    // Разрешим собственную ОБЛАСТЬ
    allowCustomScopes: true,

    // Запрет на Breaking Changes
    allowBreakingChanges: false,

    // Префикс для нижнего колонтитула
    footerPrefix: 'META:',

    // limit subject length
    subjectLimit: 100,
};
