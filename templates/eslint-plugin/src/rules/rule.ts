import { Rule } from 'eslint';

const ruleName: Rule.RuleModule = {
    create(ctx) {
        return {
            Literal: (node) => {
                ctx.report({
                    message: '🌲',
                    node,
                });
            },
        };
    },
};

export default ruleName;
