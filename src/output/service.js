const InputService = require("../input/service")

const OutputService = {
    getById(knex, id){
        return knex
        .from('incident')
        .select('approved, approver_comments, date, school_name, staff_submitter')
        .innerJoin('school','incident.school', 'school.id' )
        .where('id', id)
        .first()
    },
}

module.exports = InputService