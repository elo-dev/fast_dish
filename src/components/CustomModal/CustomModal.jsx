import { useState } from 'react'
import { Button, message, Modal, Transfer } from 'antd'

import { useAddShoppingItemMutation } from '../../redux-query/services/shoppingList'

const CustomModal = ({ isModalVisible, setIsModalVisible, recipeInfo }) => {
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const { spoonacularUsername: username, hash } = JSON.parse(
    localStorage.getItem('spoonacularAuth')
  )
  const [addToShoppingList, { isLoading }] = useAddShoppingItemMutation()

  const transferData = recipeInfo.extendedIngredients.map((item) => ({
    key: item.id,
    title: item.name,
  }))

  const handleOk = async () => {
    if (!targetKeys.length) return message.error('You haven`t added anything')

    const data = recipeInfo.extendedIngredients.filter((item) =>
      targetKeys.includes(item.id)
    )

    for (const item of data) {
      await addToShoppingList({ username, hash, item }).unwrap()
    }

    message.success('Products added successfully')

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  return (
    <Modal
      title="Add to shopping list"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          type="primary"
          disabled={isLoading}
        >
          Cancel
        </Button>,
        <Button key="submit" onClick={handleOk} disabled={isLoading}>
          Add
        </Button>,
      ]}
    >
      <Transfer
        dataSource={transferData}
        titles={['Product', 'Cart']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
    </Modal>
  )
}

export default CustomModal
