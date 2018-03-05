export const getCurrentUser = () => (
    $.ajax({
        method: 'GET',
        url: '/api/user',
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);
