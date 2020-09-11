const OutputService = {
    getById(knex, id){
        return knex
        .from('incident')
        .join('school','incident.school', 'school.id' )
        .select('incident.approved', 'incident.approver_comments', 'incident.date', 'school.school_name', 'incident.staff_submitter')        
        .where('incident.id', id)
        .first()
    },
    updateIncident(knex, id, updatedIncident){
        return knex('incident')
            .where({ id })
            .update(updatedIncident)
    },
}

module.exports = OutputService