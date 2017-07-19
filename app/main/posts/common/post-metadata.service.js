module.exports = PostMetadataService;

PostMetadataService.$inject = [
    'Util',
    'UserEndpoint',
    'ContactEndpoint',
    'FormEndpoint'
];

function PostMetadataService(
    Util,
    UserEndpoint,
    ContactEndpoint,
    FormEndpoint
) {
    var PostMetadataService = {
        // Format source (fixme!)
        formatSource: function (source) {
            if (source === 'sms') {
                return 'SMS';
            } else if (source) {
                // Uppercase first character
                return source.charAt(0).toUpperCase() + source.slice(1);
            } else {
                return 'Web';
            }
        },
        loadUser: function (post) {
            if (post.user && post.user.id) {
                return UserEndpoint.getFresh({id: post.user.id});
            }
        },
        loadContact: function (post) {
            if (!post.user && post.contact && post.contact.id) {
                return ContactEndpoint.get({ id: post.contact.id, ignore403: true });
            }
        },
        loadForm: function (post) {
            if (post.form && post.form.id) {
                return FormEndpoint.get({id: post.form.id});
            }
        }
    };

    return Util.bindAllFunctionsToSelf(PostMetadataService);
}
