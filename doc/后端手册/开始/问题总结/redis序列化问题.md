---
outline: deep
---

# redis序列化问题

## 原因

`spring-boot-starter-data-redis`的`RedisTemplate<K, V>`模板类在操作`redis`时默认使用`JdkSerializationRedisSerializer`
来进行序列化。  
会产生`\xac\xed\x00\x05t\x00\x06value1`这种乱码。

## 核心代码

```java
@Configuration
public class RedisConfig {
    @Resource
    private Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder;

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        // 使用StringRedisSerializer来序列化和反序列化redis的key值和value
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        ObjectMapper objectMapper = jackson2ObjectMapperBuilder.build();
        objectMapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );
        objectMapper.registerModule(new JavaTimeModule());

        GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        template.setValueSerializer(genericJackson2JsonRedisSerializer);
        template.setHashValueSerializer(genericJackson2JsonRedisSerializer);

        template.afterPropertiesSet();
        return template;
    }
}
```

### 片段

```java
ObjectMapper objectMapper = jackson2ObjectMapperBuilder.build();
objectMapper.activateDefaultTyping(
        LaissezFaireSubTypeValidator.instance,
        ObjectMapper.DefaultTyping.NON_FINAL,
        JsonTypeInfo.As.PROPERTY
);
objectMapper.registerModule(new JavaTimeModule());
```

`jackson2ObjectMapperBuilder.build()`为了使用自定义日期格式
`LaissezFaireSubTypeValidator.instance`
子类型验证器的作用是在序列化和反序列化过程中验证对象的子类型信息。
在Java中，对象可以有不同的子类型，而在序列化和反序列化时，需要确保正确地还原对象的类型信息。
子类型验证器可以帮助确保在反序列化时，对象的类型信息是有效和安全的，从而避免潜在的安全风险和错误。  
`ObjectMapper.DefaultTyping.NON_FINAL`表示在序列化和反序列化过程中，类型信息将被包含在JSON中，并且只有非最终类（即非final类）的类型信息会被包含。
这意味着在反序列化时，只有非最终类的类型信息会被用来还原对象的类型。  
`JsonTypeInfo.As.PROPERTY`表示在序列化和反序列化过程中，类型信息将作为JSON属性的一部分进行处理。
这意味着在JSON中会包含一个属性来表示对象的类型信息，以便在反序列化时正确地还原对象的类型。