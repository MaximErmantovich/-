import CarModel from '../models/Car.js';

export const create = async (req,res) => {
    try {
        const doc = new CarModel({
            coverUrl: req.body.coverUrl,
            name: req.body.name,
            model: req.body.model,
            year: req.body.year,
            volume: req.body.volume,
            cost: req.body.cost,
        });
        
        const car = await doc.save();
        
        res.json(car);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить автомобиль',
       });
    }
};

export const getAll = async (req, res) => {
    try{
        const cars = await CarModel.find();

        res.json(cars);
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить автомобили',
       });
    }
};

export const getOne = async (req, res) => {
    try {
        const carName = req.params.name;
        
        const foundCar = await CarModel.findOne({
            name: carName,
        });

        if (!foundCar) {
            return res.status(404).json({
                 message: 'Автомобиль не найден'
             });
        }

        res.json(foundCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({
             message: 'Не удалось получить автомобиль'
             });
    }
};

export const remove = async (req, res) => {
    try {
        const carName = req.params.name;
        
        const deletedCar = await CarModel.findOneAndDelete({ 
            name: carName,
         });

        if (!deletedCar) {
            return res.status(404).json({
                 message: 'Не удалось найти автомобиль',
                 });
        }

        res.json({ 
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Не удалось удалить автомобиль',
         });
    }
};

export const update = async (req, res) => {
    try{
        const carName = req.params.name;

        await CarModel.updateOne({
            name: carName,
        },
        {
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            model: req.body.model,
            year: req.body.year,
            volume: req.body.volume,
            cost: req.body.cost,
        });

        res.json({
            success: true,
        })
    } catch(err){
        console.error(err);
        res.status(500).json({ 
            message: 'Не удалось обновить автомобиль',
         });
    }
}

export const sort = async (req, res) => {
    const sortBy = req.params.sortBy;

    try {
        let sortedCars;
        if (sortBy === 'ascending') {
            sortedCars = await CarModel.find().sort({ cost: 1 });
        } else if (sortBy === 'descending') {
            sortedCars = await CarModel.find().sort({ cost: -1 });
        }

        res.json(sortedCars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Не удалось выполнить сортировку автомобилей' });
    }
};