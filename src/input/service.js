const InputService = {
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
    getStudentVerification(knex, marss, student_last_name){
        return knex
            .select('*')
            .from('student')
            .where('marss', marss) 
            .where('student_last_name', student_last_name)
    },
    getStaffVerification(knex, staff_name){
        return knex
            .select('*')
            .from('staff')
            .where('staff_name', staff_name)
    },
    getById(knex, id){
        return knex.from('school').select('*').where('id', id).first()
    }
}
module.exports = InputService