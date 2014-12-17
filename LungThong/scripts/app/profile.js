/**
 * Profiles view model
 */

var app = app || {};

app.Profiles = (function () {
    'use strict'

    // Activities model
    var viewModel = (function () {

        var viewsModel = {

            id: 'Users',
            fields: {
                DisplayName: {
                    field: 'DisplayName',
                    defaultValue: ''
                },
                FirstName: {
                    field: 'FirstName',
                    defaultValue: ''
                },
                LastName: {
                    fields: 'LastName',
                    defaultValue: ''
                },
                IsVerified: {
                    field: 'IsVerified',
                    defaultValue: ''
                },
                Likes: {
                    field: 'Likes',
                    defaultValue: ''
                },
                Email: {
                    field: 'Email',
                    defaultValue: ''
                }
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // Activities data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var activitiesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: activityModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Activities'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            activities: activitiesDataSource
        };

    }());
  }());