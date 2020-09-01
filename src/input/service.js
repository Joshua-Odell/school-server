const InputService = {
    getAllIncidents(knex) {
        return knex.select('*').from('school')
    },
    addIncident(knex, newIncident){
        return knex
            .insert(newIncident)
            .into('incident')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    addHold(knex, newHold){
        return knex
            .insert(newHold)
            .into('holds')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByMarssLastName(knex, marss, student_last_name){
        return knex
            .select('*')
            .from('student')
            .where('marss', marss) 
            .where('student_last_name', student_last_name)
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