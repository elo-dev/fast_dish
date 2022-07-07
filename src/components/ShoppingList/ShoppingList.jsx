import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Divider, Empty, Layout, Row, Space, Spin, Typography } from 'antd'
import { useAuth } from '../../hooks/useAuth'

import {
  useDeleteShoppingItemMutation,
  useGetShoppingListQuery,
} from '../../redux/services/shoppingList'

import style from './ShoppingList.module.scss'

const { Text } = Typography

const ShoppingList = () => {
  const { userAuth } = useAuth()

  const { data: shoppingList, isLoading } = useGetShoppingListQuery({
    username: userAuth.spoonacularUsername,
    hash: userAuth.hash,
  })

  const [deleteShoppingItem] = useDeleteShoppingItemMutation()

  const handleDelete = async (id) => {
    await deleteShoppingItem({
      username: userAuth.spoonacularUsername,
      hash: userAuth.hash,
      id,
    }).unwrap()
  }

  if (isLoading)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />

  return (
    <Layout className={style.shoppingList}>
      {shoppingList?.aisles.length ? (
        <>
          <Row gutter={[16, 20]}>
            {shoppingList.aisles.map(({ items }) =>
              items.map(
                (ingredient) =>
                  ingredient.name && (
                    <Col span={8} key={ingredient.id}>
                      <div className={style.shoppingList__content}>
                        <Space direction="vertical">
                          <p className={style.cost}>${ingredient.cost}</p>
                          <Text className={style.name}>{ingredient.name}</Text>
                          <p className={style.measures}>
                            {ingredient.measures.metric.amount}
                            {ingredient.measures.metric.unit}
                          </p>
                          <DeleteOutlined
                            className={style.delete}
                            onClick={() => handleDelete(ingredient.id)}
                          />
                        </Space>
                      </div>
                      <Divider />
                    </Col>
                  )
              )
            )}
          </Row>
          <Text className={style.totalCost}>
            Total cost: ${shoppingList.cost}
          </Text>
        </>
      ) : (
        <Empty description="The shopping list is empty" />
      )}
    </Layout>
  )
}

export default ShoppingList
