const request = require('supertest');
const app = require('./index');
console.log(app);

describe('Тестирование', () => {
  it('Должен добавить новый пост при POST запросе /auth/posts', async () => {
    const postData = { "title": 'Новый пост', "post_content": 'Содержание нового поста' };
    const response = await request(app)
      .post('/auth/posts')
      .send(postData);
    expect(response.status).toBe(200);
  });
});

describe('Тестирование метода getPosts', () => {
    it('Должен возвращать список постов', async () => {
      const response = await request(app).get('/auth/posts');
      expect(response.status).toBe(200);  
      expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('Тестирование метода updatePost', () => {
    it('Должен успешно обновленить пост', async () => {
      const postId = 52;
      const postData = { "title": 'Новый заголовок', "post_content": 'Новое содержимое' };
      const response = await request(app)
        .put(`/auth/posts/${postId}`)
        .send(postData);
      expect(response.status).toBe(200);
    });
});

describe('Тестирование метода deletePostById', () => {
    it('Должен успешно удалить пост', async () => {
      const postId = 78;
      const response = await request(app).delete(`/auth/posts/${postId}`);
      expect(response.status).toBe(200);
    });
});