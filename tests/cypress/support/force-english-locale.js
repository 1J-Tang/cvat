// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

// Existing CVAT E2E suites assert the English UI text. Keep their baseline
// deterministic after enabling browser-language detection in the application.
// A dedicated i18n test can still select another language in its visit()
// onBeforeLoad callback because that callback runs after this one.
Cypress.Commands.overwrite('visit', (originalVisit, url, options = {}) => {
    const { onBeforeLoad } = options;

    return originalVisit(url, {
        ...options,
        onBeforeLoad(window) {
            window.localStorage.setItem('i18nextLng', 'en');
            if (onBeforeLoad) {
                onBeforeLoad(window);
            }
        },
    });
});
