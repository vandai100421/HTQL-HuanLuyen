import { Card, Form, Select, Space } from "antd";
import CardTitle from "components/CardTitle";
import { useEffect, useState } from "react";
import followPlanStore, { getAllFollowPlan } from "./store";
import TableComponent from "./subcomponents/Table";
import { useHookstate } from "@hookstate/core";
import scheduleStore, { getAllSchedule } from "pages/Schedules/store";
import { TypeSchedule } from "constants/types/schedule.type";

const { Option } = Select;

const FollowPlan = () => {
  const followPlanState = useHookstate(followPlanStore);
  const scheduleState = useHookstate(scheduleStore);

  useEffect(() => {
    getAllSchedule();
  }, []);

  useEffect(() => {
    if (followPlanState.value.id !== 0) getAllFollowPlan();
  }, [followPlanState.value.id]);

  return (
    <>
      <div>
        <Card>
          <CardTitle
            title="Theo dõi kế hoạch"
            subtitle="Thông tin về theo dõi kế hoạch"
          />
          <div>
            <Space>
              <Form>
                <Form.Item label="Chọn kế hoạch">
                  <Select
                    style={{ width: 200 }}
                    value={followPlanState.value.id}
                    placeholder="Chọn kế hoạch"
                    onChange={(value) => followPlanState.merge({ id: value })}
                  >
                    {scheduleState.value.schedules.map((item: TypeSchedule) => (
                      <Option value={item.id} key={item.id}>
                        {item.tenKeHoach}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Space>
          </div>

          <TableComponent />
        </Card>
      </div>
    </>
  );
};

export default FollowPlan;
