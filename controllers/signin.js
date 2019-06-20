const handleSignIn = (req, res, db, bcrypt) => {

	const {email, password} = req.body;
	const data = {
		result: '',
		user: {}
	}
	db('login').where('email', '=', email)
	.then(user => {
		if(user.length != 0)
		{
			bcrypt.compare(password, user[0].hash, function(err, result) {
   				if(result === true)
   				{
   					db('users').where('email', '=', email)
   					.then(user =>
   					{
   						if(user.length != 0)
   						{
   							data.result = 'success';
   							data.user = user[0];
   							res.json(data);
   							return;
   						}
   						else
   						{
   							data.result = 'Invalid Credentials';
   							res.json(data);
   							return;
   						}
   					});
   				}
   				else
   				{
   					data.result = 'Invalid Credentials';
					res.json(data);
					return;
   				}
			});
		}
		else
		{
			data.result = 'User not found';
			res.json(data);
			return;

		}
	})
	.catch(() => {
		data.result = 'Error Occured';
		res.json(data);
		return;
	});

	

	
}

module.exports = {
	handleSignIn: handleSignIn
}