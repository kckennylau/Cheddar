export default (api) => ["slice", api.var(new api.func(
    [
        ["A", {
            Type: api.number
        }],
        ["B", {
            Type: api.number
        }]
    ],
    function(scope, input) {
        let item = input("self").value;
        return api.init(api.string, item.slice(
            input("A").value,
            input("B").value
        ));
    }
))]