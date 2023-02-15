const db = require('../db')

class ChecklistController {
    async createChecklist(req, res) {
        const {
            checklistname,
            atctivitytype,
            gearweight,
            datestart,
            dateend,
            tempfrom,
            tempupto,
            userid
        } = req.body

        console.log('creating new checklist');

        const checklist = await db.query(
            'INSERT INTO checklist (checklistname, atctivitytype, gearweight, datestart, dateend, tempfrom, tempupto, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING checklistid',
            [
                checklistname,
                atctivitytype,
                gearweight,
                datestart,
                dateend,
                tempfrom,
                tempupto,
                userid
            ]
        )
        res.json(checklist.rows[0])

    }

    async getChecklists(req, res) {
        console.log(`getting all checklists`)
        const checklists = await db.query('SELECT * FROM checklist')
        res.json(checklists.rows)
    }

    async getOneChecklist(req, res) {
        const id = req.params.id
        console.log(`getting checklist ${id}`)
        const checklist = await db.query('SELECT * FROM checklist WHERE checklistid = $1', [id])
        res.json(checklist.rows[0])
    }

    async updateChecklist(req, res) {
        const {
            checklistname,
            atctivitytype,
            gearweight,
            datestart,
            dateend,
            tempfrom,
            tempupto,
            userid
        } = req.body
        const checklistid = req.params.id

        console.log(`updating checklist ${checklistid}`)
        const checklist = await db.query(
            'UPDATE checklist SET checklistname=$2, atctivitytype=$3, gearweight=$4, datestart=$5, dateend=$6, tempfrom=$7, tempupto=$8, userid=$9 WHERE checklistid=$1',
            [
                checklistid,
                checklistname,
                atctivitytype,
                gearweight,
                datestart,
                dateend,
                tempfrom,
                tempupto,
                userid
            ]
        )
        res.json(checklist.rows[0])
    }

    async deleteChecklist(req, res) {
        const id = req.params.id
        console.log(`deleting checklist ${id}`)
        const checklist = await db.query('DELETE FROM checklist WHERE checklistid=$1', [id])

        res.json(checklist.rows[0])
    }

    async getChecklistsByUserid(req, res) {
        const userid = req.params.id
        console.log(`getting checklists for user ${userid}`);
        const checklists = await db.query('SELECT * FROM checklist WHERE userid=$1', [userid])
        res.json(checklists.rows)
    }
}

module.exports = new ChecklistController()
