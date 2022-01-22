  
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	let header, token;
    
	if (
		!(header = req.header('Authorization')) ||
		!(token = header.replace('Bearer ', ''))
	)
		return res.status(401).send({ message: 'Unauthorized' });

	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		console.log(verified)
		req.user = verified;
		next();
	} catch (error) {
        console.log("invalid")
		res.status(400).send({ message: 'Invalid token' });
	}
};

exports.Contents = (req, res, next) => {
	let header, token;
    
	if (!(header = req.header('Authorization')) ||
		!(token = header.replace('Bearer ', ''))){
		req.user={
			user_id:"xxxx"
		}
		next()
	}else{
		try {
			const verified = jwt.verify(token, process.env.SECRET_KEY);
			console.log(verified)
			req.user = verified;
			next();
		} catch (error) {
			console.log("invalid")
			res.status(400).send({ message: 'Invalid token' });
		}
	}
};