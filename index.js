'use strict';

module.exports = {
    MessageCatalogManager: require('./lib/message-catalog-manager').MessageCatalogManager,
    CatalogedError: require('./lib/catalogedError.js'),
    formattingMiddleware: require('./lib/errorMiddleware')
};
