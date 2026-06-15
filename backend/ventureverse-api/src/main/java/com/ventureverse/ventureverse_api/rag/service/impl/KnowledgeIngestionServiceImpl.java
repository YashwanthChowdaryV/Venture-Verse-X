package com.ventureverse.ventureverse_api.rag.service.impl;

import com.ventureverse.ventureverse_api.rag.dto.IngestionResponse;
import com.ventureverse.ventureverse_api.rag.service.EmbeddingService;
import com.ventureverse.ventureverse_api.rag.service.KnowledgeIngestionService;
import com.ventureverse.ventureverse_api.rag.service.QdrantRestService;
import com.ventureverse.ventureverse_api.rag.util.TextChunker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KnowledgeIngestionServiceImpl
        implements KnowledgeIngestionService {

    private final EmbeddingService
            embeddingService;

    private final QdrantRestService
            qdrantRestService;

    private static final String[] FILES = {
            "startup-validation.txt",
            "product-market-fit.txt",
            "yc-advice.txt",
            "lean-startup.txt",
            "fundraising.txt",
            "venture-capital.txt",
            "competitive-strategy.txt",
            "go-to-market.txt",
            "saas-metrics.txt",
            "startup-failures.txt"
    };

    @Override
    public IngestionResponse
    ingestKnowledgeBase() {

        int filesProcessed = 0;
        int chunksCreated = 0;

        try {

            qdrantRestService
                    .createCollection();

            for (String file : FILES) {

                ClassPathResource resource =
                        new ClassPathResource(
                                "knowledge/" + file
                        );

                String content =
                        Files.readString(
                                resource.getFile()
                                        .toPath()
                        );

                List<String> chunks =
                        TextChunker.chunk(
                                content,
                                1000
                        );

                for (String chunk : chunks) {

                    var embedding =
                            embeddingService
                                    .createEmbedding(
                                            chunk
                                    );

                    qdrantRestService
                            .insertVector(
                                    UUID.randomUUID()
                                            .toString(),
                                    file,
                                    chunk,
                                    embedding
                            );

                    chunksCreated++;
                }

                filesProcessed++;
            }

            return IngestionResponse
                    .builder()
                    .filesProcessed(
                            filesProcessed)
                    .chunksCreated(
                            chunksCreated)
                    .message(
                            "Knowledge Base Loaded"
                    )
                    .build();

        } catch (Exception e) {

            throw new RuntimeException(
                    e.getMessage()
            );
        }
    }
}