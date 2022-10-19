const db = require("../models");
const { validationResult } = require("express-validator");

const newsController = {
    update: async (req,res) => {
        const id = req.params.id
        const {name, content, image, categoryId, type} = req.body

        const entrie = await db.Entries.findByPk(id)
        if(!entrie) return res.status(404).send({error : 'Not found'})

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            let errorMessages = ''

            errors.array().map(error => {
                errorMessages += error.msg + '. '
            })

            return res.status(400).send(errorMessages)
        }

        db.Entries.update({
            name,
            content,
            image,
            categoryId,
            type,
            updateAt: new Date,

        },{
            where: {id}
        })
            .then(( confirm => {
                let answer;
                if(confirm) {
                    answer = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: `/news/${id}`
                        },
                        data:confirm
                    }
                } else {
                    answer = {
                        meta: {
                            status: 204, 
                            total: confirm.length,
                            url: `/news/${id}`
                        },
                        data: confirm
                    }
                }
                res.json(answer)
            }))
            .catch(error => res.send(error))
    },
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            const entrie = await db.Entries.findByPk(id)
            if(!entrie) return res.status(404).send({error : 'Not found'})
            const deleteEntry = await db.Entries.destroy(
                {
                    where: {
                        id: id
                    }
                });
            res.status(200).send({
                status: 'succes',
                message: `Entry with id ${id} deleted`
            })
        } catch (error) {
            res.send(error)
        }
    },

    // find news by id.
    findNewsId: async (req, res) => {

        const { id } = req.params;
        const entriesId = await db.Entries.findOne({ where: { id: id } })

        if (entriesId == null) {
            return res.status(404).json('El id no existe');
        }
        return res.status(200).json(entriesId);
      },
  add: async (req, res) => {
    //Check if there is any error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let errorMessages = "";

      //List of errors
      errors.array().map((error) => {
        errorMessages += error.msg + ". ";
      });

      return res.status(400).send(errorMessages);
    }

    //Else Save in db
    const { name, content, image, categoryId } = req.body;

    const entryObj = {
      name,
      content,
      image,
      categoryId,
      type: "news",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntry = new db.Entries(entryObj);
    return res.json(await newEntry.save());
  },
  getNews: async (req, res) => {
    try {
      const news = await db.Entries.findAll({
        where: {
          type: "news",
        },
        attributes: ["id", "name", "image", "content",  "createdAt"],
      });
      res.status(200).send(news)
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  findNewsId: async (req, res) => {
    const { id } = req.params;
    const entriesId = await db.Entries.findOne({ where: { id: id } });

    if (entriesId == null) {
      return res.status(404).json("El id no existe");
    }
    return res.status(200).json(entriesId);
  },
};

module.exports = newsController;
