const pool = require('./db');
class authController {
        async createPost(req, res) {
            /**
             * @swagger
             * /auth/posts:
             *   post:
             *     summary: Создание поста
             *     description: Создает новый пост с указанным заголовком и содержимым.
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               title:
             *                 type: string
             *                 description: Заголовок поста
             *               post_content:
             *                 type: string
             *                 description: Содержимое поста
             *             required:
             *               - title
             *               - post_content
             *     responses:
             *       '200':
             *         description: Успешно создано
             *       '400':
             *         description: Неверный запрос
             *       '500':
             *         description: Ошибка сервера
             */
            try {
                const { title, post_content } = req.body;
                const query = 'INSERT INTO posts (title, post_content) VALUES ($1, $2)';
                const values = [title, post_content];
                const result = await pool.query(query, values);
                res.sendStatus(200);
                console.log(req.body);
            } catch (e) {
                console.error('Ошибка при создании поста:', e);
                res.status(500).json({ error: 'Ошибка при создании поста' });
            }
        }
        async getPosts(req, res) {
            /**
             * @swagger
             * /auth/posts:
             *   get:
             *     summary: Получение всех постов
             *     description: Получение всех постов с заголовком и содержимым.
             *     responses:
             *       '200':
             *         description: Успешно получено
             *       '400':
             *         description: Неверный запрос
             *       '500':
             *         description: Ошибка сервера
             */
            try {
                const query = 'SELECT * FROM posts';
                const result = await pool.query(query);
                res.json(result.rows);
            } catch (e) {
                console.error('Ошибка при получении постов:', e);
                res.status(500).json({ error: 'Ошибка при получении постов', details: e.message });
            }
        }
        async updatePost(req, res) { 
            /** 
             * @swagger 
             * /auth/posts/{id}: 
             *   put: 
             *     summary: Обновление поста 
             *     description: Обновляет информацию о посте. 
             * 
             *     requestBody: 
             *       required: true 
             *       content: 
             *         application/json: 
             *           schema: 
             *             type: object 
             *             properties: 
             *               title: 
             *                 type: string 
             *                 description: Новый заголовок поста 
             *               post_content: 
             *                 type: string 
             *                 description: Новое содержимое поста 
             *             required: 
             *               - title 
             *               - post_content 
             *     consumes: 
             *       - application/json 
             *     produces: 
             *       - application/json 
             *     parameters: 
             *       - in: path 
             *         name: id 
             *         required: true 
             *         description: Идентификатор поста 
             *         schema: 
             *           type: integer 
             *     responses: 
             *       '200': 
             *         description: Пост успешно обновлен 
             *       '404': 
             *         description: Пост не найден 
             *       '500': 
             *         description: Ошибка сервера 
             */ 
            const { id } = req.params 
            const { title, post_content } = req.body 
           
            console.log("Received data:", req.body) // Добавляем логирование 
           
            try { 
             const query = 
              "UPDATE posts SET title = $1, post_content = $2 WHERE id = $3" 
             await pool.query(query, [title, post_content, id]) 
           
             res.status(200).send("Пост успешно обновлен") 
            } catch (error) { 
             console.error("Ошибка при обновлении поста:", error) 
             res.status(500).send("Произошла ошибка при обновлении поста") 
            } 
           }        
        async deletePostById(req, res) {
            /**
             * @swagger
             * /auth/posts/{id}:
             *   delete:
             *     summary: Удаление поста по идентификатору
             *     description: Удаляет пост из базы данных по его идентификатору.
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         description: Идентификатор поста, который нужно удалить
             *         schema:
             *           type: integer
             *     responses:
             *       '200':
             *         description: Пост успешно удален
             *       '404':
             *         description: Пост не найден
             *       '500':
             *         description: Ошибка сервера
             */
            try {
                const postId = req.params.id;
                const query = 'DELETE FROM posts WHERE id = $1';
                const result = await pool.query(query, [postId]);
                
                if (result.rowCount === 1) {
                    res.status(200).json({ message: 'Пост успешно удален' });
                } else {
                    res.status(404).json({ error: 'Пост не найден' });
                }
            } catch (e) {
                console.error('Ошибка при удалении поста:', e);
                res.status(500).json({ error: 'Ошибка при удалении поста', details: e.message });
            }
        }
    }

    module.exports = new authController();
