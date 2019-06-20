const handleProfileGet = (req, res, db) => {

	const { id } = req.params;
	database.users.forEach(user => {
		if(user.id === id)
		{
			return res.json(user);
		}
	});

	res.status(404).json('no such user');


}

const handleImage = (req, res, db) => {

	const { id } = req.body;

	let data = {
		result: '',
		user: {}
	}

	db('users').where('id', '=', id)
	.then((user) => {

		if(user.length != 0)
		{
			db('users')
			.where('id', '=', id)
			.update({
				entries: (Number(user[0].entries) + 1)
			},
			'entries')
			.then(response => {
	   							res.json(response);
	   							return;

			})
			.catch(response => {
						res.status(400).json("Update Failed");
						return;
					});
		}
		else
		{
			res.status(400).json("User not found");
						return;
		}		

	});
		


}

module.exports = {
	handleProfileGet: handleProfileGet,
	handleImage: handleImage
}