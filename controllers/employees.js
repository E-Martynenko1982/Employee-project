const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/employees/
 * @desc get all employees
 * @access Private
 */
const all = async (req, res) => {
try {
  const employees = await prisma.employee.findMany();
  res.status(200).json(employees);
} catch  {
  res.status(400).json({message: 'Error data'})
}
}

/**
 * @route POST /api/employees/add
 * @desc Add employee
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'All fields most filled' })
    }
    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id
      }
    })
return res.status(201).json(employee)
    
  } catch {
    res.status(400).json({message: 'Error data'})
  }
}

/**
 * @route POST /api/employees/remove/:id
 * @desc Remove employee
 * @access Private
 */

const remove = async (req, res) => {
  const { id } = req.body;
try {
  await prisma.employee.delete({
    where: {
      id
    }
  });
  return res.status(204).json('OK');
} catch  {
  res.status(500).json({message: 'Remove error'})
}

}

/**
 * @route PUT /api/employees/edit/:id
 * @desc Edit employee
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });
    res.status(204).json('OK')
  } catch {
    res.status(500).json({ message: 'Edit error' })
  }
};


/**
 * @route GET /api/employees/:id
 * @desc Get employee
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id
      }
    });
    res.status(200).json(employee);
  } catch {
    res.status(500).json({ message: 'Get employee error' })
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee
}