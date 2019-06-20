const handleSignUp = (req, res, db, bcrypt) => {

	const {email, name, password} = req.body;
	bcrypt.hash(password, 10, (err, hash) => {
		
		db.transaction(trx => {
				trx('login')
				.returning('*')
				.insert({
					hash: hash,
					email: email
				}).then(response => {
					return trx('users')
						.returning('*')
						.insert({
							id: response[0].id,
							name: name,
							email: email,
							joined: new Date()
						}).then(user => {
							res.status(200).json(user[0]);
							return;
						})
						.catch(err => {
							res.status(400).json("Error Occured"); 
							return;
						});
				})
				.then(trx.commit)
				.catch(trx.rollback);
				

			

		})
		.catch(response => {
					res.status(400).json("Sign up Failed");
					return;
		});
		

	});

}

module.exports = {
	handleSignUp: handleSignUp
};