const OutputService = {
    getById(knex, id){
        return knex
        .from('incident')
        .join('school','incident.school', 'school.id' )
        .select('incident.approved', 'incident.approver_comments', 'incident.date', 'school.school_name', 'incident.staff_submitter')        
        .where('incident.id', id)
        .first()
    },
    getWhole(knex){
        return knex
        .from('incident')
        .join('school','incident.school', 'school.id' )
        .join('student', 'incident.student_marss', 'student.marss')
        .join('holds', 'incident.hold_1', 'holds.id')
        .join('staff', 'incident.staff_submitter', 'staff.staff_name')
        .select('*')
        .where('incident.approved',  true)
        .first()
    },
    updateIncident(knex, id, updatedIncident){
        return knex('incident')
            .where({ id })
            .update(updatedIncident)
    },
}

module.exports = OutputService