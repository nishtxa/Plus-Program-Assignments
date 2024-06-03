module.exports = (sequelise, Sequelise) => {
    const Assets = sequelise.define( "assets",{
        id:{
            type: Sequelise.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelise.INTEGER,
            references: {
                model: 'users', // This is the name of the table, not the model
                key: 'id', // the key in the user table that we're referencing
            }
        }, 
        type:{
            type: Sequelise.STRING
        },
        value:{
            type: Sequelise.INTEGER
        },
        description:{
            type: Sequelise.STRING
        }
    })
    return Assets;
}