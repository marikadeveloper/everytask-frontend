import { useDashboardTasks } from "../utils/task";

function DashboardScreen() {
  /* TODO: dashboard query */
  const { data, isPending } = useDashboardTasks();

  console.log({ data, isPending });

  /**
   * {
   *  "data": {
   *    "dueTodayOrOverdue": [
   *      {
   *        "id": "1d187324-ab6c-4693-8371-005a5307b9ce",
   *        "emoji": "2764-fe0f",
   *        "title": "Buy birthday presents",
   *        "description": null,
   *        "status": "TODO",
   *        "dueDate": "2024-03-31T10:13:15.659Z",
   *        "createdAt": "2024-03-31T10:13:45.245Z",
   *        "categoryId": null,
   *        "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
   *        "impact": "HIGH_IMPACT_HIGH_EFFORT",
   *        "relativeOrder": 0,
   *        "firstCompletedAt": null,
   *        "category": null
   *      }
   *    ],
   *    "upcomingTasks": [
   *      {
   *        "id": "ee69a4e4-e4b7-424b-90dd-3ae91a91f2e8",
   *        "emoji": null,
   *        "title": "Pay for singing lessons",
   *        "description": null,
   *        "status": "TODO",
   *        "dueDate": "2024-04-10T10:13:00.000Z",
   *        "createdAt": "2024-03-31T10:14:16.415Z",
   *        "categoryId": null,
   *        "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
   *        "impact": "HIGH_IMPACT_LOW_EFFORT",
   *        "relativeOrder": 1,
   *        "firstCompletedAt": null,
   *        "category": null
   *      },
   *      {
   *        "id": "7cfdbe62-1d5a-4d45-bbb8-c9e89338659b",
   *        "emoji": "1f64f",
   *        "title": "Paint the walls of the kitchen",
   *        "description": null,
   *        "status": "TODO",
   *        "dueDate": "2024-05-11T10:14:00.000Z",
   *        "createdAt": "2024-03-31T10:14:55.151Z",
   *        "categoryId": "c2fea52b-cef9-4f0f-a1ac-0fe766c40e6d",
   *        "userId": "d1fffe0a-2e6d-458c-b976-ca14ef67bc3d",
   *        "impact": "HIGH_IMPACT_HIGH_EFFORT",
   *        "relativeOrder": 2,
   *        "firstCompletedAt": null,
   *        "category": {
   *          "id": "c2fea52b-cef9-4f0f-a1ac-0fe766c40e6d",
   *          "name": "home"
   *        }
   *      }
   *    ]
   *  }
   * }
   */

  return (
    <div className="layout dashboard">
      <h1>Dashboard</h1>
    </div>
  );
}

export default DashboardScreen;
