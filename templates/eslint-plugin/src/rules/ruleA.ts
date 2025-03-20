import { Rule } from 'eslint';

const ruleA: Rule.RuleModule = {
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

export default ruleA;
