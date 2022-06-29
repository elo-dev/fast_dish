import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Divider, Empty, Layout, Row, Spin, Typography } from 'antd'

import {
  useDeleteShoppingItemMutation,
  useGetShoppingListQuery,
} from '../../redux-query/services/shoppingList'

import style from './ShoppingList.module.scss'

const { Text } = Typography

const ShoppingList = () => {
  const { spoonacularUsername: username, hash } = JSON.parse(
    localStorage.getItem('spoonacularAuth')
  )
  const { data: shoppingList, isLoading } = useGetShoppingListQuery({
    username,
    hash,
  })
  const [deleteShoppingItem] = useDeleteShoppingItemMutation()

  const handleDelete = async (id) => {
    await deleteShoppingItem({ username, hash, id }).unwrap()
  }

  if (isLoading)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />

  return (
    <Layout className={style.shoppingList}>
      {shoppingList.aisles.length ? (
        <>
          <Row gutter={20}>
            {shoppingList.aisles.map(({ items }) =>
              items.map(
                (ingredient) =>
                  ingredient.name && (
                    <Col span={8} key={ingredient.id}>
                      <Row align="middle" justify="space-between">
                        <Col>
                          <p className={style.cost}>${ingredient.cost}</p>
                          <Text className={style.name}>{ingredient.name}</Text>
                          <p className={style.measures}>
                            {ingredient.measures.metric.amount}
                            {ingredient.measures.metric.unit}
                          </p>
                        </Col>
                        <Col>
                          <DeleteOutlined
                            className={style.delete}
                            onClick={() => handleDelete(ingredient.id)}
                          />
                        </Col>
                      </Row>
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
