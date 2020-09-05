const router = require('express').Router(),
	Send = require('../models'),
	codegen = require('meaningful-string')

router.post('/api/push', async (req, res) => {
	const { filename, filesize } = req.body
	const send = await new Send({ filename, filesize, code: codegen.meaningful().toLowerCase() }).save()
	res.send({ filename, filesize, code: send.code })
})

router.get('/api/find/:code', async (req, res) => {
	const { code } = req.params
	const send = await Send.findOne({ code }).exec()
	res.send({ filename: send.filename, filesize: send.filesize, code })
})

module.exports = router