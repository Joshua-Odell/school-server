const InputService = {
    getAllIncidents(knex) {
        return knex.select('*').from('school')
    },
    addIncident(knex, newIncident){
        return knex
            .insert(newIncident)
            .into('school')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id){
        return knex.from('school').select('*').where('id', id).first()
    },
    deleteIncident(knex, id){
        return knex('school')
            .where({ id })
            .delete()
    },
    updateIncident(knex, id, updatedIncident){
        return knex('school')
            .where({ id })
            .update(updatedIncident)
    },
}

module.exports = InputService