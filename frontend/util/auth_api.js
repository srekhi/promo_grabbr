export const googleAuth = code => (
    $.ajax({
        method: 'POST',
        url: '/api/auth/google',
        data: {
            code: code
        }
    })
);
