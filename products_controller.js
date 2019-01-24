const create=(req, res, next)=>{
    const db = req.app.get('db');
    const {name, description, price, image_url} = req.body
    db.create_product([name, description, price, image_url]).then(()=>{
        res.sendStatus(200)
        .catch(err => {
            res.status(500).send("uuh-ohh")
            console.log(err)
        })
    })
}

const getOne=(req, res, next)=>{
    const db = req.app.get('db');
    db.read_product(req.params.id).then(results=>{
        res.status(200).json(results)
    }).catch(err=>{
        res.status(500).send('uh oh bad things happened')
        console.log(err)
    })
}

const getAll=(req, res, next)=>{
    const db = req.app.get('db');
    db.read_products().then(results=>{
        // console.log(results)
        res.status(200).json(results)
    }).catch(err=>{
        console.log(err)
        res.status(500).send('There was an error')
    })
}

const update=(req, res, next)=>{
    const db = req.app.get('db')
    db.update_product(req.params.id, req.query.description).then(()=>{
        res.sendStatus(200)
    }).catch(err=>{
        res.status(500).send('oh no it broke')
    })
}

const deleteFn=(req, res, next)=>{
    const db = req.app.get('db')
    db.delete_product(req.params.id).then(()=>{
        res.sendStatus(200)
    }).catch(err=>{
        res.status(500).send('oh no it broke')
    })
}

module.exports={
    create,
    getOne,
    getAll,
    update,
    deleteFn
}