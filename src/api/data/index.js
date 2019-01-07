export default {

    call(ID, name, data) {
        var datas = {}
        if (data == null) {
            datas = {
                scenarioId: ID
            }
        } else {
            datas = {
                scenarioId: ID,
                parameterList: [
                    {
                        parameterInfo1: [
                            {
                                parameterName1: ID,
                                parameterList1: data
                            }
                        ]

                    }
                ]
            }
        }
        return datas
    }
}