export const getCurrentUser = () => (
    $.ajax({
      method: 'GET',
      url: '/api/user',
      headers: {"Authorization": localStorage.getItem('token')}
    })
  );
