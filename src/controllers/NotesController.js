
const knexfile = require("../../knexfile")
const knex = require("../database/knex")

const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");


class NotesController {
  async create(request, response) {
    const { title, description, tags, rating } = request.body
    const user_id = request.user.id

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      user_id,
      rating
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("movie_notes").where({ id }).first()
    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

    return response.json({ note, tags })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movie_notes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let notes

    if (tags) {
      const filterTags = tags.split(",").map(tag => tag.trim())

      notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id",
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("movie_notes.title")

    } else {
      notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("movie_tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      return {
        ...note,
        movie_tags: noteTags
      }
    })

    return response.json(notesWithTags)
  }


  async update(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.params;

    // Excluir todas as tags existentes para a nota
    await knex("movie_tags").where({ note_id: id }).del();

    // Atualizar a nota (incluindo title, description, rating)
    await knex("movie_notes").where({ id }).update({
      title,
      description,
      rating,
      updated_at: new Date(),
    });

    // Adicionar as novas tags à nota, se houver tags fornecidas
    if (tags && tags.length > 0) {
      const newTags = tags.map(name => ({
        note_id: id,
        name,
        user_id: request.user.id,
      }));

      await knex("movie_tags").insert(newTags);
    }

    return response.json();
  }

}

module.exports = NotesController 