import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useHookstate } from "@hookstate/core";
import {
  Button,
  Card,
  Input,
  message,
  Popconfirm,
  Space,
  Table,
  Tabs,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { productApi } from "apis/product";
import CardTitle from "components/CardTitle";
import { Status as StatusType } from "constants/types/common.type";
import { Product } from "constants/types/product.type";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import styles from "pages/Products/Products.module.css";
import productsStore, {
  filterProductList,
  fetchProductList,
} from "pages/Products/store";
import { FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_NEW_PRODUCT, EDIT_PRODUCT } from "routes/route.constant";
import { replaceParams } from "utils/route";

const handleFormatDataSourceProducts = (products: Array<Product>) => {
  return products.map((product) => {
    if (isEmpty(product.variations)) {
      return {
        ...product,
        is_parent: true,
      };
    } else {
      return {
        ...product,
        is_parent: true,
        children: product.models.map((model) => ({ ...model, isModel: true })),
      };
    }
  });
};

const Products: FC = () => {
  const navigate = useNavigate();
  const productsState = useHookstate(productsStore);

  useEffect(() => {
    fetchProductList();
  }, []);

  const formFilter = useFormik({
    initialValues: {
      name: "",
      sku: "",
      status: "",
      categoryIds: [] as Array<string>,
    },
    onSubmit: (data) => {
      const { name, sku, categoryIds, status } = data;
      const categoryId = categoryIds[categoryIds.length - 1];
      filterProductList({
        name,
        sku,
        status,
        product_category_id: categoryId,
      });
    },
  });

  const handleChangePage = (page: number, pageSize: number) => {
    const params = {
      ...(formFilter.values as any),
      page,
      limit: pageSize,
    };
    fetchProductList(params);
  };

  const changeFilterStatus = (status: string) => {
    const params: any = {
      ...formFilter.values,
      status,
    };
    filterProductList(params);
    formFilter.setFieldValue("status", status);
  };

  const handleConfirmDeleteProduct = async (productId: string) => {
    try {
      await productApi.delete(productId);
      message.success("Xóa sản phẩm thành công.");
      formFilter.submitForm();
    } catch (error: any) {
      message.error(error.response.data.error.message);
    }
  };

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        render: (_, product) => {
          return (
            <>
              <Space align="start">
                <div className={styles.img}>
                  <img
                    src={require(`../../assets/images/` + product.image)}
                    alt="undefined"
                  />
                </div>
                <div>
                  <span className={styles.name}>{product.name}</span>
                </div>
              </Space>
            </>
          );
        },
        width: 400,
      },
      {
        title: "Giá",
        dataIndex: "price",
      },
      {
        title: "Loại",
        dataIndex: "dishtypes",
        render: (TypeDishType) => TypeDishType.name,
      },
      {
        title: "Thao tác",
        width: 200,
        render: (_, product) => (
          <>
            {product.is_parent && (
              <Space direction="horizontal">
                <Button
                  type="link"
                  size="small"
                  onClick={() =>
                    navigate(replaceParams(EDIT_PRODUCT, [product.id]))
                  }
                  icon={<EditOutlined />}
                />
                {product.status !== ("deleted" as StatusType) && (
                  <Popconfirm
                    title="Xóa sản phẩm này?"
                    onConfirm={() => handleConfirmDeleteProduct(product.id)}
                  >
                    <Button
                      type="link"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                )}
              </Space>
            )}
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className={styles.wrapper}>
        <Card>
          <CardTitle
            title="Danh sách sản phẩm"
            subtitle="Tổng hợp tất cả sản phẩm của hệ thống"
          />
          <Tabs
            activeKey={formFilter.values.status}
            onChange={changeFilterStatus}
          ></Tabs>
          <div className={styles.filter}>
            <Space>
              <Input
                suffix={<SearchOutlined />}
                placeholder="Tên sản phẩm"
                allowClear
                name="name"
                value={formFilter.values.name}
                onChange={formFilter.handleChange}
              />

              {/* <InputSelectProductCategory
                categoryIds={formFilter.values.categoryIds}
                onChange={handleSelectProductCategory}
                placeholder="Danh mục sản phẩm"
              /> */}
              <Button type="primary" onClick={formFilter.submitForm}>
                Tìm kiếm
              </Button>
            </Space>
          </div>
          {formFilter.values.status !== "deleted" && (
            <div className={styles.action}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate(ADD_NEW_PRODUCT)}
              >
                Tạo mới
              </Button>
            </div>
          )}

          <div>
            <Table
              size="small"
              bordered
              columns={columns}
              dataSource={handleFormatDataSourceProducts(
                productsState.products.get()
              )}
              pagination={{
                size: "default",
                // pageSize: productsState.limit.get(),
                // current: productsState.page.get(),
                // total: productsState.total.get(),
                hideOnSinglePage: true,
                onChange: handleChangePage,
              }}
              loading={productsState.isLoadingGetAllProduct.get()}
              rowKey={(row) => row.id}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Products;
