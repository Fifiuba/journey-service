const {app} = require('./app')

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
