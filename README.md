# 前后端对接文档
### 问题类型模块
- 触发事件：`用户点击某一类型模块时`
- 接口地址：`/dulishuo/backend/get_question.php`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "type": 0
        }
        ```
    - 说明：
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>type</td>
                    <td>int</td>
                    <td>0代表大学，1代表自我，2代表世界。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例：
        ```json
        {
            "errcode": 0,
            "errmsg": "",
            "question": [
                {
                    "id": 10,
                    "text": "问题1",
                    "click": 22
                },
                {
                    "id": 6,
                    "text": "问题2",
                    "click": 78
                }
            ]
        }
        ```
    - 说明：
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errcode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errmsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>question</td>
                    <td>array</td>
                    <td>相关问题信息的数组。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>问题的索引。</td>
                </tr>
                <tr>
                    <td>text</td>
                    <td>string</td>
                    <td>问题的文本。</td>
                </tr>
                <tr>
                    <td>click</td>
                    <td>int</td>
                    <td>问题被点击的次数。</td>
                </tr>
            </tbody>
        </table>
### 随机答案的获得
- 触发事件：`用户点击某一问题时`或`用户点击不满意时`
- 接口地址：`/dulishuo/backend/get_answer.php`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "id": 6
        }
        ```
    - 说明：
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>点击某一问题时为问题的索引；<br />点击不满意时为0。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例：
        ```json
        {
            "errcode": 0,
            "errmsg": "",
            "answer": "随机回答"
        }
        ```
    - 说明：
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errcode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errmsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>answer</td>
                    <td>string</td>
                    <td>随机回答。</td>
                </tr>
            </tbody>
        </table>
### emmm，好像没有什么了，甚至连登录认证都不用了
### 完。\_(:зゝ∠)\_
    